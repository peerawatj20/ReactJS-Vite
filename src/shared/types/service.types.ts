/**
 * Generic Type สำหรับฟังก์ชันใน Service
 * @template TRequest - Type ของ Request payload
 * @template TResponse - Type ของ Response data ที่คาดหวัง
 */
export type ServiceMethod<TRequest, TResponse> = (
  data: TRequest,
) => Promise<TResponse>;
