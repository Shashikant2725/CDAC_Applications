import React from 'react'
import Button from '@mui/material/Button';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import ViewIcon from '@mui/icons-material/ViewAgenda';

import ReactReadMoreReadLess from "react-read-more-read-less";

const ReadTableFunctions = ({ post, handleEditPostForm, handleEditPostForm1,posts }) => {

  console.log("Posts::",posts);
  return (
    <>
      {posts.map((post) => (
        <tr key={post._id}>
          {/* <td >{post.userId}</td> */}
          {/* <td>{post._id}</td> */}
          <td>{post.FunctionName}</td>
          <td>
          <ReactReadMoreReadLess
                                                    charLimit={40}
                                                    readMoreText={"▼"}
                                                    readLessText={"▲"}
                                                    readMoreClassName="read-more-less--more"
                                                    readLessClassName="read-more-less--less"
                                                >
                                                  {post.Description}
                                                </ReactReadMoreReadLess>
            </td> 
         
          {/* <td>{post.Description}</td> */}
          <td>{post.Version}</td>
          {/* <td>{post.Code}</td> */}

          {/* <td>{post.Version}</td> */}



          {/* <td>{post.body}</td> */}
          <td>
          {/* <button
              type="button"
              style={{ color:"white",backgroundColor:"#137EA9",width:"100px",height:"40px"}}
              data-bs-toggle="modal"
              data-bs-target="#editModalForm1"
              onClick={(e) => handleEditPostForm1(e, post)}
            >
              View 
            </button> */}

            <Button variant="outlined" startIcon={<ViewIcon />}
                data-bs-toggle="modal"
                data-bs-target="#editModalForm1"
                onClick={(e) => handleEditPostForm1(e, post)}
            >
        View
      </Button>
          </td>
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

export default ReadTableFunctions