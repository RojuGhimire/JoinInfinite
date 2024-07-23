import { Button, Heading, useDisclosure } from "@chakra-ui/react";
import React, { useState } from "react";
import { useMutation, useQuery, useQueryClient } from "react-query";

import { toast } from "react-toastify";
import {
  adminauthorizationAxiosInstance,
  authorizationAxiosInstance,
} from "../../axios/Axios";
import DeleteModal from "../../components/ui/admin/DeleteModal";
import "../../styles/table.css";
import { useToast } from "@chakra-ui/react";
import ViewEventModal from "../../components/ui/admin/ViewEventModal";

const AdminPost = () => {
  const [selectedUserId, setSelectedUserId] = useState("");
  const [page, setPage] = useState(0);
  const toast = useToast();
  const {
    isOpen: isDeleteOpen,
    onOpen: onDeleteOpen,
    onClose: onDeleteClose,
  } = useDisclosure();

  const {
    isOpen: isViewOpen,
    onOpen: onViewOpen,
    onClose: onViewClose,
  } = useDisclosure();

  const queryClient = useQueryClient();

  //Get All User
  async function getAllPostData(pageParam) {
    const LIMIT = 10;
    const res = await adminauthorizationAxiosInstance.get(
      `/events/?page=${pageParam}&limit=${LIMIT}`
    );
    return res.data;
  }

  const {
    isLoading,
    isError,
    error,
    data: posts,
    isFetching,
    isPreviousData,
  } = useQuery(["getallpostdata", page], () => getAllPostData(page), {
    keepPreviousData: true,
  });

  //Delete User
  const deleteUser = useMutation(
    (id) => {
      return adminauthorizationAxiosInstance.delete(`/events/${id}`);
    },
    {
      onSuccess: (response) => {
        toast({
          title: response.data.message,
          position: "top-right",
          status: "success",
          duration: 5000,
          isClosable: true,
        });
        onDeleteClose();
        queryClient.invalidateQueries({ queryKey: ["getallpostdata"] });
      },
      onError: (error) => {
        toast.error(error.response.data.message);
      },
    }
  );

  if (isLoading) return <p>Loading User..</p>;

  if (isError) return <p>Error:{error.message}</p>;

  const nextPage = () => setPage((prev) => prev + 1);
  const prevPage = () => setPage((prev) => prev - 1);

  const nav = (
    <div className="btn-container">
      <button onClick={prevPage} disabled={isPreviousData || page === 1}>
        Prev
      </button>

      <button
        onClick={nextPage}
        disabled={isPreviousData || page === posts.total_events}
      >
        {" "}
        Next
      </button>
    </div>
  );

  return (
    <>
      <section className="w-full overflow-auto flex flex-col gap-6  h-screen">
        <div
          style={{
            padding: "1rem",
            display: "flex",
            alignItems: "center",
            gap: "5rem",
            justifyContent: "center",
          }}
        >
          <Heading>Events</Heading>
        </div>
        {isFetching && <span>Loading..</span>}

        <div className=" container ">
          <table>
            <thead>
              <tr>
                {/* <th>Id</th> */}
                <th className="text-center">Event Name</th>
                <th className="text-center">Event Description</th>
                <th className="text-center">Event Location</th>
                <th className="text-center">Action</th>
              </tr>
            </thead>

            <tbody>
              {posts?.events &&
                posts?.events.map((elem, index) => {
                  return (
                    <React.Fragment key={index}>
                      <tr className="text-center">
                        {/* <td>{index + 1}</td> */}
                        <td>{elem.event_name.toUpperCase()}</td>
                        <td>{elem.description.substring(0, 30)}...</td>

                        <td>{elem.location_address.toUpperCase()}</td>
                        <td
                          style={{
                            display: "flex",
                            gap: "1rem",
                            justifyContent: "center",
                          }}
                        >
                          {" "}
                          <Button
                            onClick={() => {
                              setSelectedUserId(elem.event_id);
                              onDeleteOpen();
                            }}
                          >
                            Delete
                          </Button>
                          <Button
                            onClick={() => {
                              setSelectedUserId(elem.event_id);
                              onViewOpen();
                            }}
                          >
                            View
                          </Button>
                        </td>
                      </tr>
                    </React.Fragment>
                  );
                })}
            </tbody>
          </table>
        </div>
        {nav}

        <DeleteModal
          isDeleteOpen={isDeleteOpen}
          onDeleteClose={onDeleteClose}
          id={selectedUserId}
          setSelectedUserId={setSelectedUserId}
          deleteUser={deleteUser}
        />

        <ViewEventModal
          isViewOpen={isViewOpen}
          onViewClose={onViewClose}
          selectedUserId={selectedUserId}
          setSelectedUserId={setSelectedUserId}
        />
      </section>
    </>
  );
};

export default AdminPost;
