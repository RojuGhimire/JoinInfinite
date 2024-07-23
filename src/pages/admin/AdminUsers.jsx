import { Avatar, Button, Heading, useDisclosure, useToast } from "@chakra-ui/react";
import { useState } from "react";
import { useMutation, useQuery, useQueryClient } from "react-query";
import { adminauthorizationAxiosInstance } from "../../axios/Axios";
import "../../styles/table.css";

import Table from "../../components/shared/Table";
import DeleteModal from "../../components/ui/admin/DeleteModal";
import EditModal from "../../components/ui/admin/EditModal";

const AdminUsers = () => {
  const [selectedUserId, setSelectedUserId] = useState("");
  const queryClient = useQueryClient();
  const toast = useToast();
  const {
    isOpen: isDeleteOpen,
    onOpen: onDeleteOpen,
    onClose: onDeleteClose,
  } = useDisclosure();
  const {
    isOpen: isEditOpen,
    onOpen: onEditOpen,
    onClose: onEditClose,
  } = useDisclosure();

  //Get All User
  async function getAllUserData() {
    try {
      const res = await adminauthorizationAxiosInstance.get("/users");
      return res.data;
    } catch (error) {
      console.error("Error fetching data", error);
    }
  }

  const { data, isLoading, isError } = useQuery(
    "getalluserdata",
    getAllUserData
  );

  //Delete User
  const deleteUser = useMutation(
    (id) => {
      return adminauthorizationAxiosInstance.delete(`/users/${id}`);
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
        queryClient.invalidateQueries({ queryKey: ["getalluserdata"] });
      },
      onError: (error) => {
        toast.error(error.response.data.message);
      },
    }
  );

  //submit edit data
  const onSubmitData = (
    { username, email, age, address, interested_genre, role },
    id
  ) => {
    const data = {
      username,
      email,
      age,
      address,
      role,
      interested_genre: interested_genre.map((elem) => elem.value),
    };

    putUserProfileMutation.mutate({ data, id });
  };

  async function putUserProfile(request) {
    const res = await adminauthorizationAxiosInstance.put(
      `/users/${request.id}`,
      request.data
    );
    return res;
  }

  const putUserProfileMutation = useMutation({
    mutationFn: async (request) => await putUserProfile(request),
    onSuccess: async () => {
      toast({
        title: "User Edited Successfully",
        position: "top-right",
        status: "success",
        duration: 5000,
        isClosable: true,
      });
      onEditClose();
      queryClient.invalidateQueries({ queryKey: ["getalluserdata"] });
    },
    onError: async (error) => {
      toast({
        title: error?.response?.data?.detail[0]?.msg,
        position: "top-right",
        status: "error",
        duration: 5000,
        isClosable: true,
      });
    },
  });

  const columns = [
    {
      Header: "Image",
      accessor: "photo_url",
      Cell: ({ row }) => {
        return (
          <>
            <Avatar
              size="md"
              name=""
              src={row.original.photo_url}
            />{" "}
          </>
        );
      },
    },

    {
      Header: "Username",
      accessor: "username",
    },
    {
      Header: "Role",
      accessor: "role",
    },
    {
      Header: "Email",
      accessor: "email",
    },
    {
      Header: "Address",
      accessor: "address",
    },
    {
      Header: "Action",
      accessor: "editDeleteAction",

      Cell: ({ row }) => {
        if (row.original.role === "Admin") {
          return null;
        } else {
          return (
            <>
              <Button
                onClick={() => {
                  setSelectedUserId(row.original.id);
                  onEditOpen();
                }}
                mr={2}
              >
                Edit
              </Button>
              <Button
                onClick={() => {
                  setSelectedUserId(row.original.id);
                  onDeleteOpen();
                }}
              >
                Delete
              </Button>
            </>
          );
        }
      },
    },
  ];

  if (isLoading) return <div>Loading...</div>;
  if (isError) return <div>Error fetching data</div>;

  if (!data || !data.length) return <div>No data available</div>;

  return (
    <>
      <section className="w-full overflow-auto flex flex-col gap-6  h-screen">
        <div
          style={{
            padding: "0.3rem",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Heading>Users</Heading>
        </div>

        <Table data={data} columns={columns} />

        <DeleteModal
          isDeleteOpen={isDeleteOpen}
          onDeleteClose={onDeleteClose}
          id={selectedUserId}
          setSelectedUserId={setSelectedUserId}
          deleteUser={deleteUser}
        />
        <EditModal
          isEditOpen={isEditOpen}
          onEditClose={onEditClose}
          selectedUserId={selectedUserId}
          setSelectedUserId={setSelectedUserId}
          onSubmitData={onSubmitData}
        />
      </section>
    </>
  );
};

export default AdminUsers;
