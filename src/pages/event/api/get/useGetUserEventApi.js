import { useInfiniteQuery } from "react-query";
import { authorizationAxiosInstance } from "../../../../axios/Axios";
import { useContext } from "react";
import { UserContext } from "../../../../context/Context";

export const useGetUserEventApi = () => {
  const LIMIT = 10;
  const { userDetail } = useContext(UserContext);

  const fetchData = async ({ pageParam }) => {
    const offset = pageParam || 0;
    try {
      const res = await authorizationAxiosInstance.get(
        `/events/my-events/user/${userDetail.id}/?page=${offset}&limit=${LIMIT}`
      );

      const { total_events, events, total_pages, has_next_page, skip } =
        res.data;
      return {
        page: skip,
        pageSize: LIMIT,
        totalItems: total_events,
        totalPages: total_pages,
        items: events,
        hasNextPage: has_next_page,
      };
    } catch (error) {
      throw new Error("Failed to fetch data");
    }
  };

  const {
    data,
    error,
    fetchNextPage,
    hasNextPage,
    isFetching,
    isLoading,
    isSuccess,
    refetch,
  } = useInfiniteQuery("organizer-events", fetchData, {
    getNextPageParam: (lastPage) =>
      lastPage.hasNextPage ? lastPage.page + 1 : null,
  });

  return {
    data,
    error,
    fetchNextPage,
    hasNextPage,
    isFetching,
    isLoading,
    isSuccess,
    refetch,
  };
};
