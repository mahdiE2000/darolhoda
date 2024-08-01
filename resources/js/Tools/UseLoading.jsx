import { useDispatch } from 'react-redux';

const UseLoading = () => {
  const dispatch = useDispatch();

  const setLoading = (isLoading) => {
    dispatch({ type: 'set', loading: isLoading });
  };

  return setLoading;
};

export default UseLoading;
