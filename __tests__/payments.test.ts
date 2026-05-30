import {create} from 'axios';

import {createPayment, getPaymentInfo} from '@/api/payments';

jest.mock('axios', () => {
  const mockApi = {
    post: jest.fn(),
    get: jest.fn(),
  };

  return {
    __esModule: true,
    create: jest.fn(() => mockApi),
    __mockApi: mockApi,
  };
});

const {__mockApi: mockApi} = jest.requireMock('axios') as {
  __mockApi: {
    post: jest.Mock;
    get: jest.Mock;
  };
};

describe('payments api', () => {
  beforeEach(() => {
    mockApi.post.mockReset();
    mockApi.get.mockReset();
  });

  it('configures axios with the API base URL and device header', () => {
    expect(create).toHaveBeenCalledWith({
      baseURL: 'https://payments.test/api/v1',
      headers: {
        'X-Device-Id': 'test-device-id',
      },
    });
  });

  it('creates a payment order with multipart form data', async () => {
    mockApi.post.mockResolvedValueOnce({data: {identifier: 'order-1'}});

    await createPayment({
      expected_output_amount: 25.5,
      fiat: 'EUR',
      notes: 'Test order',
    });

    expect(mockApi.post).toHaveBeenCalledWith(
      '/orders/',
      expect.any(FormData),
      expect.objectContaining({
        headers: {
          'Content-Type': 'multipart/form-data',
        },
        transformRequest: expect.any(Function),
      }),
    );
  });

  it('fetches payment info by identifier', async () => {
    mockApi.get.mockResolvedValueOnce({data: {identifier: 'order-1'}});

    await getPaymentInfo('order-1');

    expect(mockApi.get).toHaveBeenCalledWith('/orders/info/order-1');
  });
});
