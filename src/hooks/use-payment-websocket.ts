import {WS_BASE_URL} from '@env';
import {useEffect, useState} from 'react';

const PAYMENT_COMPLETE_STATUSES = new Set(['AC', 'CM', 'CO']);

type PaymentWebsocketState = {
  identifier?: string | null;
  status: string | null;
  isConnected: boolean;
  isPaid: boolean;
  lastEvent: unknown;
  error: string | null;
};

function getInitialState(identifier?: string | null): PaymentWebsocketState {
  return {
    identifier,
    status: null,
    isConnected: false,
    isPaid: false,
    lastEvent: null,
    error: null,
  };
}

function parseSocketPayload(data: unknown) {
  if (typeof data !== 'string') {
    return data;
  }

  try {
    return JSON.parse(data);
  } catch {
    return data;
  }
}

function getPaymentStatus(payload: unknown) {
  if (!payload || typeof payload !== 'object' || !('status' in payload)) {
    return null;
  }

  const {status} = payload as {status?: unknown};
  return typeof status === 'string' ? status : null;
}

export function usePaymentWebsocket(identifier?: string | null) {
  const [state, setState] = useState(() => getInitialState(identifier));

  useEffect(() => {
    if (!identifier) {
      return;
    }

    const socketUrl = `${WS_BASE_URL}/${identifier}`;
    const socket = new WebSocket(socketUrl);

    socket.onopen = () => {
      setState(current => {
        const nextState =
          current.identifier === identifier
            ? current
            : getInitialState(identifier);

        return {
          ...nextState,
          identifier,
          isConnected: true,
          error: null,
        };
      });
    };

    socket.onmessage = event => {
      const payload = parseSocketPayload(event.data);
      const paymentStatus = getPaymentStatus(payload);
      setState(current => {
        const nextState =
          current.identifier === identifier
            ? current
            : getInitialState(identifier);

        return {
          ...nextState,
          identifier,
          lastEvent: payload,
          status: paymentStatus ?? nextState.status,
          isPaid: paymentStatus
            ? PAYMENT_COMPLETE_STATUSES.has(paymentStatus)
            : nextState.isPaid,
        };
      });
    };

    socket.onerror = event => {
      setState(current => {
        const nextState =
          current.identifier === identifier
            ? current
            : getInitialState(identifier);

        return {
          ...nextState,
          identifier,
          isConnected: false,
          lastEvent: event,
          error: 'WebSocket error',
        };
      });
    };

    socket.onclose = () => {
      setState(current => {
        const nextState =
          current.identifier === identifier
            ? current
            : getInitialState(identifier);

        return {
          ...nextState,
          identifier,
          isConnected: false,
        };
      });
    };

    return () => {
      socket.close();
    };
  }, [identifier]);

  if (state.identifier !== identifier) {
    return getInitialState(identifier);
  }

  return {
    status: state.status,
    isConnected: state.isConnected,
    isPaid: state.isPaid,
    lastEvent: state.lastEvent,
    error: state.error,
  };
}
