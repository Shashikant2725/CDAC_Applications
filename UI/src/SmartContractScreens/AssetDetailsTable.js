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
         {/* <td>{post.key}</td>
          <td>{post.Public_Mandatory}</td>
          <td>{post.Public_Mandatory}</td> */}
          <td>
          {posts.map(detail => (
            <ul>
              <li>{detail.Key}</li>
             </ul>
        ))}
        </td>
        <td>
          {posts.map(detail => (
            <ul>
              <li>{detail.Record.Public_Mandatory}</li>
             </ul>
        ))}
        </td>
        <td>
          {posts.map(detail => (
            <ul>
                <li>{detail.Record.Public_Mutable}</li>
             </ul>
        ))}
        </td>
        <td>
          {posts.map(detail => (
            <ul>
            
              <li>{detail.Record.Private_Mandatory}</li>
             </ul>
        ))}
        </td>
        <td>
          {posts.map(detail => (
            <ul>
              <li>{detail.Record.Private_Mutable}</li>
             </ul>
        ))}
        </td>
        
          {/* <td>
          {post.publicMandatory.map(detail => (
            <ul>
              <li>{detail.publicMandatoryField}</li>
             </ul>
        ))}
        </td>
         <td>
        {post.publicMandatory.map(detail => (
            <ul>
              <li>{detail.publicMandatoryData}</li>
             </ul>
        ))}
        </td>
         <td>
        {post.privateMandatory.map(detail => (
            <ul>
              <li>{detail.privateMandatoryField}</li>
             </ul>
        ))}
        </td>
         <td>
        {post.privateMandatory.map(detail => (
            <ul>
            <li>{detail.privateMandatoryData}</li>
           </ul>
        ))}
        </td> */}
        
          {/* <td>
           
            <Button variant="outlined" startIcon={<MoveUpIcon />}
              data-bs-toggle="modal"
              data-bs-target="#editModalForm"
              onClick={(e) => handleEditPostForm(e, post)}
            >
        Transfer Ownership
      </Button>
          </td> */}
        
        </tr>

      ))}

    </>
  )
}

export default ReadTable