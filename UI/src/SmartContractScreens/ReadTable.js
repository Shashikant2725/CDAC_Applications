import React from 'react'
import Button from '@mui/material/Button';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import ViewIcon from '@mui/icons-material/ViewAgenda';
const ReadTable = ({ post, handleEditPostForm, posts }) => {

  console.log("Posts::",posts);
  return (
    <>
      {posts.map((post) => (
        <tr key={post._id}>
          <td>{post.StakeholderName}</td>
          <td>
            {/* <button
              type="button"
              style={{ color:"white",backgroundColor:"#137EA9",width:"100px",height:"40px"}}
              data-bs-toggle="modal"
              data-bs-target="#editModalForm"
              onClick={(e) => handleEditPostForm(e, post)}
            >
              Edit
            </button> */}
            <Button variant="outlined" startIcon={<EditIcon />}
              data-bs-toggle="modal"
              data-bs-target="#editModalForm"
              onClick={(e) => handleEditPostForm(e, post)}
            >
        Edit
      </Button>
          </td>
        </tr>

      ))}

    </>
  )
}

export default ReadTable