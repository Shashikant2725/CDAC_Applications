import React from 'react'
import Button from '@mui/material/Button';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import ViewIcon from '@mui/icons-material/ViewAgenda';
import MoveUpIcon from '@mui/icons-material/MoveUp';
const ReadTable = ({ post, handleEditPostForm, posts }) => {

  console.log("Posts:::",posts);
  return (
    <>

      {posts.map((post) => (
        <tr key={post._id}>
         <td>{post._id}</td>
          <td>{post.orgName}</td>
          <td>{post.userName}</td>
          <td>
           
            <Button variant="outlined" startIcon={<MoveUpIcon />}
              data-bs-toggle="modal"
              data-bs-target="#editModalForm"
              onClick={(e) => handleEditPostForm(e, post)}
            >
        Transfer Ownership
      </Button>
          </td>
        
        </tr>

      ))}

    </>
  )
}

export default ReadTable