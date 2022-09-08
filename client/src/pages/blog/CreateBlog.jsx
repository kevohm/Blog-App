import React from 'react'
import { useLocation, useParams } from 'react-router-dom';
import FormatData from '../../components/FormatData'

const CreateBlog = ({ hideUpdate = true }) => {
  const { state } = useLocation()
  const { id } = useParams()
  return hideUpdate ? (
    <FormatData myUsername={state} />
  ) : (
    <FormatData myUsername={state.username} hideUpdate={hideUpdate} initialBody={{title: state.title, text:state.text}} id={id} />
  );
};

export default CreateBlog