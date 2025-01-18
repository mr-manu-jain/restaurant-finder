// import React, { useState, useEffect } from 'react';
// import { Table, Thead, Tbody, Tr, Th, Td, Box, Badge, Menu, MenuButton, MenuList, MenuItem, IconButton } from '@chakra-ui/react';
// import { SettingsIcon } from '@chakra-ui/icons';
// import axios from 'axios';

// export default function BusinessOwnersList() {
//   const [businessOwners, setBusinessOwners] = useState([]);

//   useEffect(() => {
//     fetchBusinessOwners();
//   }, []);

//   const fetchBusinessOwners = async () => {
//     try {
//       const response = await axios.post('http://springboot-app-finedine-dev.us-east-1.elasticbeanstalk.com/api/users/getAllUsers');
//       const owners = response.data.users.filter(user => user.role === 'Admin');
//       setBusinessOwners(owners);
//     } catch (error) {
//       console.error('Error fetching business owners:', error);
//     }
//   };

//   const handleEditBusinessOwner = async (ownerId) => {
//     // Implement edit business owner functionality
//   };

//   return (
//     <Box overflowX="auto" bg="white" borderRadius="lg" boxShadow="sm" p={4}>
//       <Table variant="simple">
//         <Thead>
//           <Tr>
//             <Th>OWNER NAME</Th>
//             <Th>BUSINESS NAME</Th>
//             <Th>CONTACT</Th>
//             <Th>RESTAURANTS</Th>
//             <Th>STATUS</Th>
//             <Th>ACTIONS</Th>
//           </Tr>
//         </Thead>
//         <Tbody>
//           {businessOwners.map((owner) => (
//             <Tr key={owner.id}>
//               <Td>{owner.name}</Td>
//               <Td>N/A</Td>
//               <Td>{owner.email}</Td>
//               <Td>N/A</Td>
//               <Td>
//                 <Badge colorScheme="green">Active</Badge>
//               </Td>
//               <Td>
//                 <Menu>
//                   <MenuButton as={IconButton} icon={<SettingsIcon />} variant="ghost" />
//                   <MenuList>
//                     <MenuItem onClick={() => handleEditBusinessOwner(owner.id)}>Edit Profile</MenuItem>
//                     <MenuItem>View Details</MenuItem>
//                     <MenuItem>Suspend Account</MenuItem>
//                   </MenuList>
//                 </Menu>
//               </Td>
//             </Tr>
//           ))}
//         </Tbody>
//       </Table>
//     </Box>
//   );
// }