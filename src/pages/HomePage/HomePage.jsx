

// import DocumentTitle from '../../components/DocumentTitle';
import DocumentTitle from '../../components/DocumentTitle';

const styles = {
  container: {
    minHeight: 'calc(100vh - 50px)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontWeight: 500,
    fontSize: 48,
    textAlign: 'center',
  },
};

export default function HomePage() {
  return (
    <>
      <DocumentTitle>Home</DocumentTitle>

      <div style={styles.container}>
        <h1 style={styles.title}>
          Task manager welcome page{' '}
          <span role="img" aria-label="Greeting icon">
            💁‍♀️
          </span>
        </h1>
      </div>
    </>
  );
}



// import { useEffect } from 'react';
// import { useDispatch, useSelector } from 'react-redux';
// import DocumentTitle from '../../components/DocumentTitle';
// import { TaskList } from '../../components/TaskList/TaskList';
// import { TaskEditor } from '../../components/TaskEditor/TaskEditor';
// import { fetchTasks } from '../../redux/tasks/operations';
// import { selectLoading } from '../../redux/tasks/selectors';

// export default function TasksPage() {
//   const dispatch = useDispatch();
//   const isLoading = useSelector(selectLoading);

//   useEffect(() => {
//     dispatch(fetchTasks());
//   }, [dispatch]);

//   return (
//     <>
//       <DocumentTitle>Your tasks</DocumentTitle>
//       <TaskEditor />
//       <div>{isLoading && 'Request in progress...'}</div>
//       <TaskList />
//     </>
//   );
// }
