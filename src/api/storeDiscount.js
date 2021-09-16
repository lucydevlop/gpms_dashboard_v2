import io from '@utils/io';

export function deleteCorpTicket(data) {
  return io.delete(
    `${process.env.REACT_APP_API_DOMAIN_URL}/dashboard/parking/discount/cancel/ticket/${data}`,
    data
  );
}
