import React, { useState, useEffect } from 'react';
import { Table, Thead, Tbody, Tr, Th, Td, IconButton, Box, Badge, Menu, MenuButton, MenuList, MenuItem, useDisclosure, Modal, ModalOverlay, ModalContent, ModalHeader, ModalBody, ModalCloseButton, Button } from '@chakra-ui/react';
import { SettingsIcon } from '@chakra-ui/icons';
import axios from 'axios';
import EditUserForm from './EditUserForm';

export default function UsersList({ searchTerm }) {
  const [users, setUsers] = useState([]);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [selectedUser, setSelectedUser] = useState(null);
  const [filteredUsers, setFilteredUsers] = useState([]);
  useEffect(() => {
    fetchUsers();
  }, []);

  useEffect(() => {
    if (!searchTerm) {
      setFilteredUsers(users); // Reset to show all users when searchTerm is empty
    } else {
      const filtered = users.filter((user) =>
        user.name.toLowerCase().includes(searchTerm.toLowerCase())
      );
      setFilteredUsers(filtered);
    }
  }, [searchTerm, users]);
  

  const fetchUsers = async () => {
    try {
      const response = await axios.post('http://springboot-app-finedine-dev.us-east-1.elasticbeanstalk.com/api/users/getAllUsers');
      setUsers(response.data.users);
    } catch (error) {
      console.error('Error fetching users:', error);
    }
  };

  const handleEditUser = (user) => {
    setSelectedUser(user);
    onOpen();
  };

  const handleDeleteUser = async (userId) => {
    if (window.confirm('Are you sure you want to delete this user?')) {
      try {
        await axios.post('http://springboot-app-finedine-dev.us-east-1.elasticbeanstalk.com/api/users/deleteUser', { userId });
        fetchUsers(); // Refresh the user list
      } catch (error) {
        console.error('Error deleting user:', error);
      }
    }
  };

  return (
    <Box overflowX="auto" bg="white" borderRadius="lg" boxShadow="sm" p={4}>
      <Table variant="simple">
        <Thead>
          <Tr>
            <Th>USER</Th>
            <Th>ROLE</Th>
            {/* <Th>STATUS</Th>
            <Th>JOINED</Th> */}
            <Th>ACTIONS</Th>
          </Tr>
        </Thead>
        <Tbody>
          {filteredUsers.map((user) => (
            <Tr key={user.id}>
              <Td>{user.name}</Td>
              <Td>
                <Badge colorScheme="blue">{user.role}</Badge>
              </Td>
              {/* <Td>
                <Badge colorScheme="green">Active</Badge>
              </Td>
              <Td>{new Date(user.createdAt).toLocaleDateString()}</Td> */}
              <Td>
                <Menu>
                  <MenuButton as={IconButton} icon={<SettingsIcon />} variant="ghost" />
                  <MenuList>
                    <MenuItem onClick={() => handleEditUser(user)}>Edit User</MenuItem>
                    <MenuItem color="red.500" onClick={() => handleDeleteUser(user.oid)}>Delete User</MenuItem>
                  </MenuList>
                </Menu>
              </Td>
            </Tr>
          ))}
        </Tbody>
      </Table>

      <Modal isOpen={isOpen} onClose={onClose} size="xl">
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Edit User</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            {selectedUser && <EditUserForm user={selectedUser} onClose={onClose} refreshUsers={fetchUsers} />}
          </ModalBody>
        </ModalContent>
      </Modal>
    </Box>
  );
}