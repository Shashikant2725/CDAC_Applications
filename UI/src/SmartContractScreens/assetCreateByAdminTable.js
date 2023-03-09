import React from 'react'
import Button from '@mui/material/Button';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import ViewIcon from '@mui/icons-material/ViewAgenda';
import VisibilityIcon from '@material-ui/icons/Visibility';

const AssetCreateByAdminTable = ({ post, handleEditPostForm, posts,showDetail }) => {
  console.log("Posts:::",posts);
  return (
    <>
      {posts.map((post) => (
         
        <tr key={post._id}>
              
            <td>{post._id}</td>
          <td>{post.assetName}</td>
          {/* <td>
               <Button variant="outlined" startIcon={<EditIcon />}
              data-bs-toggle="modal"
              data-bs-target="#editModalForm"
              onClick={(e) => handleEditPostForm(e, post)}
            >
        Edit
      </Button>
            </td> */}
          {/* <td>{post.userName}</td> */}
        </tr>

      ))}

    </>
  )
}

export default AssetCreateByAdminTable