

// import React, { useState } from 'react';
// import {
//   List,
//   ListItem,
//   ListItemIcon,
//   ListItemText,
//   Collapse,
//   Checkbox,
// } from '@mui/material';
// import ExpandLess from '@mui/icons-material/ExpandLess';
// import ExpandMore from '@mui/icons-material/ExpandMore';

// const departments = [
//   {
//     department: 'customer_service',
//     sub_departments: ['support', 'customer_success'],
//   },
//   {
//     department: 'design',
//     sub_departments: ['graphic_design', 'product_design', 'web_design'],
//   },
// ];

// const DepartmentList: React.FC = () => {
//   const [open, setOpen] = useState<string[]>([]);
//   const [selected, setSelected] = useState<string[]>([]);

//   // Toggle handling for opening/closing department lists
//   const handleClick = (department: string) => {
//     const isOpen = open.includes(department);
//     setOpen(isOpen ? open.filter((d) => d !== department) : [...open, department]);
//   };

//   // Checkbox handling for selecting sub-departments
//   const handleCheckboxChange = (value: string) => {
//     const isSelected = selected.includes(value);
//     let newSelected: string[] = [];

//     if (isSelected) {
//       newSelected = selected.filter((v) => v !== value);
//     } else {
//       newSelected = [...selected, value];
//     }

//     setSelected(newSelected);
//   };

//   // Check if a sub-department is selected
//   const isSelected = (value: string) => selected.includes(value);

//   // Handle selecting all sub-departments of a department
//   const handleSelectAll = (department: string) => {
//     const allSelected = departments.find((dept) => dept.department === department)?.sub_departments || [];
//     setSelected((prevSelected) => {
//       const updatedSelection = [...prevSelected];
//       if (updatedSelection.includes(department)) {
//         // Deselect all sub-departments
//         updatedSelection.splice(updatedSelection.indexOf(department), 1);
//         allSelected.forEach((subDept) => {
//           const index = updatedSelection.indexOf(subDept);
//           if (index !== -1) {
//             updatedSelection.splice(index, 1);
//           }
//         });
//       } else {
//         // Select department and all sub-departments
//         updatedSelection.push(department);
//         updatedSelection.push(...allSelected);
//       }
//       return updatedSelection;
//     });
//   };

//   // Handle checkbox change for the department itself
//   const handleDepartmentCheckboxChange = (department: string) => {
//     const isSelected = selected.includes(department);
//     let newSelected: string[] = [];

//     if (isSelected) {
//       newSelected = selected.filter((v) => v !== department);
//     } else {
//       newSelected = [...selected, department];
//     }

//     setSelected(newSelected);
//   };

//   return (
//     <List component="nav">
//       {departments.map((dept, index) => (
//         <React.Fragment key={index}>
//           <ListItem button onClick={() => handleClick(dept.department)}>
//             <ListItemIcon>
//               <Checkbox
//                 edge="start"
//                 checked={selected.includes(dept.department)}
//                 onChange={() => handleDepartmentCheckboxChange(dept.department)}
//               />
//               {open.includes(dept.department) ? <ExpandLess /> : <ExpandMore />}
//             </ListItemIcon>
//             <ListItemText primary={dept.department} />
//           </ListItem>
//           <Collapse in={open.includes(dept.department)} timeout="auto" unmountOnExit>
//             <List component="div" disablePadding>
//               {dept.sub_departments.map((subDept, subIndex) => (
//                 <ListItem
//                   key={subIndex}
//                   button
//                   onClick={() => handleCheckboxChange(subDept)}
//                   style={{ paddingLeft: 32 }}
//                 >
//                   <ListItemIcon>
//                     <Checkbox
//                       edge="start"
//                       checked={isSelected(subDept)}
//                       onClick={(event) => {
//                         event.stopPropagation(); // Stop propagation to prevent ListItem click
//                         handleCheckboxChange(subDept); // Handle checkbox change
//                       }}
//                     />
//                   </ListItemIcon>
//                   <ListItemText primary={subDept} />
//                 </ListItem>
//               ))}
//             </List>
//           </Collapse>
//         </React.Fragment>
//       ))}
//     </List>
//   );
// };

// export default DepartmentList;


import React, { useState } from 'react';
import {
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Collapse,
  Checkbox,
} from '@mui/material';
import ExpandLess from '@mui/icons-material/ExpandLess';
import ExpandMore from '@mui/icons-material/ExpandMore';

const departments = [
  {
    department: 'customer_service',
    sub_departments: ['support', 'customer_success'],
  },
  {
    department: 'design',
    sub_departments: ['graphic_design', 'product_design', 'web_design'],
  },
];

const DepartmentList: React.FC = () => {
  const [open, setOpen] = useState<string[]>([]);
  const [selected, setSelected] = useState<string[]>([]);

  // Toggle handling for opening/closing department lists
  const handleClick = (department: string) => {
    const isOpen = open.includes(department);
    setOpen(isOpen ? open.filter((d) => d !== department) : [...open, department]);
  };

  // Handle checkbox change for the department itself
  const handleDepartmentCheckboxChange = (department: string) => {
    const allSubDepartments = departments.find((dept) => dept.department === department)?.sub_departments || [];
    const isSelected = selected.includes(department);
    let newSelected: string[] = [];

    if (isSelected) {
      newSelected = selected.filter((v) => v !== department && !allSubDepartments.includes(v));
    } else {
      newSelected = [...selected, department, ...allSubDepartments.filter((subDept) => !selected.includes(subDept))];
    }

    setSelected(newSelected);
  };

  // Handle checkbox change for individual sub-departments
  const handleCheckboxChange = (department: string, subDepartment: string) => {
    const isSelected = selected.includes(subDepartment);
    let newSelected: string[] = [];

    if (isSelected) {
      newSelected = selected.filter((v) => v !== subDepartment);
    } else {
      newSelected = [...selected, subDepartment];
    }

    // Check if all sub-departments are selected and update the department selection accordingly
    const allSubDepartments = departments.find((dept) => dept.department === department)?.sub_departments || [];
    const allSelected = allSubDepartments.every((subDept) => newSelected.includes(subDept));
    if (allSelected && !selected.includes(department)) {
      newSelected.push(department);
    } else if (!allSelected && selected.includes(department)) {
      newSelected = newSelected.filter((v) => v !== department);
    }

    setSelected(newSelected);
  };

  // Check if a value (department or sub-department) is selected
  const isSelected = (value: string) => selected.includes(value);

  return (
    <List component="nav">
      {departments.map((dept, index) => (
        <React.Fragment key={index}>
          <ListItem button onClick={() => handleClick(dept.department)}>
            <ListItemIcon>
              <Checkbox
                edge="start"
                checked={selected.includes(dept.department)}
                indeterminate={dept.sub_departments.some((subDept) => selected.includes(subDept)) && !selected.includes(dept.department)}
                onChange={(event) => {
                  event.stopPropagation(); // Stop propagation to prevent ListItem click
                  handleDepartmentCheckboxChange(dept.department); // Handle checkbox change
                }}
              />
              {open.includes(dept.department) ? <ExpandLess /> : <ExpandMore />}
            </ListItemIcon>
            <ListItemText primary={dept.department} />
          </ListItem>
          <Collapse in={open.includes(dept.department)} timeout="auto" unmountOnExit>
            <List component="div" disablePadding>
              {dept.sub_departments.map((subDept, subIndex) => (
                <ListItem
                  key={subIndex}
                  button
                  onClick={(event) => {
                    event.stopPropagation(); // Stop propagation to prevent ListItem click
                    handleCheckboxChange(dept.department, subDept); // Handle checkbox change
                  }}
                  style={{ paddingLeft: 32 }}
                >
                  <ListItemIcon>
                    <Checkbox
                      edge="start"
                      checked={isSelected(subDept)}
                    />
                  </ListItemIcon>
                  <ListItemText primary={subDept} />
                </ListItem>
              ))}
            </List>
          </Collapse>
        </React.Fragment>
      ))}
    </List>
  );
};

export default DepartmentList;
