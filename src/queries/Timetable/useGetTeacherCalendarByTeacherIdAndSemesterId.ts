import { ApiResponseType, responseWrapper } from '@queries/helpers';
import { useQuery, useQueryClient, UseQueryOptions } from 'react-query';
import { timeTableStatusApi } from '.';
import { API_TIMETABLES_QUERIES } from './keys';
import { TimetableResponse } from './types';

export const useGetTeacherCalendarByTeacherIdAndSemesterId = (
  options?: UseQueryOptions<ApiResponseType<TimetableResponse[]>, Error> & {
    semesterId: string;
    teacherId: string;
  },
) => {
  const {
    data,
    isError,
    isLoading,
    isFetching,
    error,
    refetch: onGetTeacherTimetables,
  } = useQuery<ApiResponseType<TimetableResponse[]>, Error>(
    [API_TIMETABLES_QUERIES.CALENDAR_BY_TEACHER_ID, options?.semesterId, options?.teacherId],
    async ({ queryKey }) => {
      const [, ...params] = queryKey;
      return responseWrapper<ApiResponseType<TimetableResponse[]>>(
        timeTableStatusApi.getTeacherCalendarByTeacherIdAndSemesterId,
        params,
      );
    },
    {
      keepPreviousData: true,
      enabled: !!options?.semesterId && !!options?.teacherId,
      ...options,
    },
  );

  const queryClient = useQueryClient();

  const handleInvalidateTimetables = () => {
    queryClient.invalidateQueries([
      API_TIMETABLES_QUERIES.CALENDAR_BY_TEACHER_ID,
      options?.semesterId,
      options?.teacherId,
    ]);
  };

  return {
    teacherCalendar: data?.result || [],
    isPending: isLoading || isFetching,
    isError,
    error,
    onGetTeacherTimetables,
    handleInvalidateTimetables,
  };
};
