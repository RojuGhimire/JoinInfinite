import {
  Box,
  Card,
  Flex,
  SkeletonCircle,
  SkeletonText
} from "@chakra-ui/react";
import React, { useCallback, useMemo, useRef } from "react";
import EventCard from "../../components/ui/event/EventCard";
import { useGetAllEventApi } from "./api/useGetAlLEventApi";
import { usePostInterestedEvent } from "./api/usePostInterestedEvent";
import { usePostLikeEvent } from "./api/usePostLikeEvent";
import HasNoMoreData from "./HasNoMoreData";

const HomeV2 = () => {
  const { postLikeEventMutation } = usePostLikeEvent();
  const { postInterestedEventMutation } = usePostInterestedEvent();
  const observer = useRef();

  const {
    data,
    error,
    fetchNextPage,
    hasNextPage,
    isFetching,
    isLoading,
    isSuccess,
    refetch,
  } = useGetAllEventApi();

  const flattenedData = useMemo(
    () => (data ? data?.pages.flatMap((item) => item.items) : []),
    [data]
  );

  const lastElementRef = useCallback(
    (node) => {
      if (isLoading) return;
      if (observer.current) observer.current.disconnect();
      observer.current = new IntersectionObserver(
        (entries) => {
          if (entries[0].isIntersecting && hasNextPage && !isFetching) {
            fetchNextPage();
          }
        },
        { threshold: 0.5 } // Adjust the threshold as needed
      );
      if (node) observer.current.observe(node);
    },
    [isLoading, hasNextPage, isFetching, fetchNextPage]
  );

  if (isLoading)
    return (
      <div className=" w-[64%] h-full  bg-gray-100  overflow-y-auto  flex items-center justify-between ">
        <h1 className=" w-full text-center">Loading Data</h1>;
      </div>
    );

  if (error)
    return (
      <div className=" min-w-[64%] h-full  bg-gray-100  overflow-y-auto  flex items-center justify-between ">
        <h1></h1>;<h1 className=" w-full text-center">Could not fetch data</h1>;
      </div>
    );

  const content = isSuccess && (
    <div>
      <div>
        {flattenedData.map((item, i) => (
          <React.Fragment key={Math.random()}>
            <EventCard
              ref={flattenedData.length === i + 1 ? lastElementRef : null}
              event={item}
              isMyEvent={false}
              postLikeEventMutation={postLikeEventMutation}
              postInterestedEventMutation={postInterestedEventMutation}
              refetch={refetch}
            />
          </React.Fragment>
        ))}
          {!hasNextPage && <HasNoMoreData/>}
      </div>

      {isFetching && (
        <>
          <Card maxW="md" mt="4" mb="4" w={"50rem"} h={"20rem"} p={2} >
            <Flex gap={2}>
              {" "}
              <Box flex={1}>
                <SkeletonCircle size="10" />
              </Box>
              <Box flex={5}>
                {" "}
                <SkeletonText
                  mt="4"
                  noOfLines={1}
                  spacing="4"
                  skeletonHeight="4"
                />
              </Box>
            </Flex>

            <SkeletonText
              mt="4"
              noOfLines={1}
              spacing="4"
              skeletonHeight="180"
            />

            <Flex gap={2}>
              <Box flex={1}>
                <SkeletonText
                  mt="4"
                  noOfLines={1}
                  spacing="4"
                  skeletonHeight="10"
                />
              </Box>
              <Box flex={1}>
                <SkeletonText
                  mt="4"
                  noOfLines={1}
                  spacing="4"
                  skeletonHeight="10"
                />
              </Box>
            </Flex>
          </Card>
     
        </>
      )}
      
    </div>
  );

  return (
    <>
      <div className=" w-[100%] lg:w-[64%] h-full  bg-gray-100  overflow-y-auto  flex items-center justify-between  ">
        <section className="text-gray-600 body-font  w-full h-full">
          <div className=" flex justify-center w-full h-full  overflow-y-auto ">
            {content}
          </div>
        </section>
      </div>
    </>
  );
};

export default HomeV2;
