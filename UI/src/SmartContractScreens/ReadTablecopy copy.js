import React from 'react'
import Button from '@mui/material/Button';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import ViewIcon from '@mui/icons-material/ViewAgenda';
import VisibilityIcon from '@material-ui/icons/Visibility';

import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
// import Button from '@mui/material/Button';
const ReadTable = ({ post, handleEditPostForm, posts,showDetail }) => {

  console.log("Posts:::",posts);
  return (
    <>

      {posts.map((post) => (
         
        <tr key={post._id}>
               <td>
                <Button
                        onClick={(e)=>showDetail(e,post)} 
                        style={{textTransform: 'none'}}
                        size="small"
                        // data-bs-toggle="modal"
                        // data-bs-target="#detailsModalForm"
                        // data-bs-toggle="modal"
                        // data-bs-target="#editModalForm"
                        // onClick={(e) => handleEditPostForm(e, post)}
                        >
                        <VisibilityIcon style={{color: '#10346a'}}/>
                </Button>

            </td>
            <td>{post._id}</td>

          <td>{post.orgName}</td>
          <td>{post.userName}</td>
         
          
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
        </td>
        


        <td>
        {post.publicCommonData.map(detail => (
            <ul>
            <li>{detail.publicDataField}</li>
           </ul>
        ))}
        </td>
         <td>
        {post.publicCommonData.map(detail => (
            <ul>
            <li>{detail.publicData}</li>
           </ul>
        ))}
        </td>
         <td>
        {post.privateCommonData.map(detail => (
            <ul>
            <li>{detail.privateDataField}</li>
           </ul>
        ))}
        </td>
         <td>
        {post.privateCommonData.map(detail => (
            <ul>
            <li>{detail.privateData}</li>
           </ul>
        ))}
        </td> */}
        </tr>

      ))}

    </>
  )
}

export default ReadTable