import React, { useEffect } from 'react';
import './App.scss';
import { TextField } from '@material-ui/core';
import { DataGrid, GridColDef } from '@material-ui/data-grid';
import { fetchNewsThunk, filterArticles, selectFilteredNews, selectNewsLoading } from './store/newsReducer';
import { useDispatch, useSelector } from 'react-redux';


function App() {

  const rowHeight = 60;

  const columns: GridColDef[] = [
    { 
      field: 'imageUrl',
      headerName: ' ',
      width: rowHeight,
      sortable: false,
      renderCell: ({value}) =>
        (<img src={value as string}
              height={rowHeight + 'px'}
              alt={value as string}/>)
    },
    {
      field: 'newsSite',
      headerName: 'Source',
      width: 160,
    },
    {
      field: 'title',
      headerName: 'Title',
      flex:1,
    },
    {
      field: 'publishedAt',
      headerName: 'Date',
      width: 160,
    },
    {
      field: 'url',
      headerName: 'URL',
      flex:1,
      sortable: false,
      renderCell: ({value}) =>
        (<a href={value as string}>{value}</a>)
    },
  ];

  const filteredNews = useSelector(selectFilteredNews)
  const loading = useSelector(selectNewsLoading);
  const dispatch = useDispatch();

  const pageSize = 10;

  function seachTextChangeHandler(event: React.ChangeEvent<HTMLInputElement>) {
    dispatch(filterArticles(event.target.value));
  }

  useEffect(() => {
    dispatch(fetchNewsThunk());
  }, [dispatch]);

  return (
    <div className="grid">
      <TextField id="newSearchBox"
              label="Search news"
              onChange={seachTextChangeHandler}
              type="search"
              className="component"/>
      <div style={{height: (rowHeight * (pageSize + 1)) + 58 + 'px',}}
          className="component">
        <DataGrid rows={filteredNews}
                  columns={columns}
                  pageSize={pageSize}
                  loading={loading}
                  components={{
                    NoRowsOverlay: () => (
                      <p className="error">
                        Can't show any news
                      </p>
                    )
                  }}
                  rowHeight={rowHeight}
        />
      </div>
      
    </div>
  );
}

export default App;
