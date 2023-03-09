import React from "react";

import BootstrapTable from 'react-bootstrap-table-next';
import paginationFactory, { PaginationProvider, PaginationListStandalone } from 'react-bootstrap-table2-paginator';
import filterFactory, { textFilter } from 'react-bootstrap-table2-filter';
import ToolkitProvider, {Search} from 'react-bootstrap-table2-toolkit/dist/react-bootstrap-table2-toolkit';
import Functions from "./functions.json";
class T4 extends React.Component {

    state = { Functions }
    render() {
        const expandRow = {
            onlyOneExpanding: true,
            renderer: row => (
              <div>
                <h5><b>{ `Full Description of ${row.fname} ` }</b></h5>
                <p><b>{`${row.fullDescription}`}</b></p>
              </div>
            )
          };
        const { SearchBar } = Search;
    const options = {
        paginationSize: 4,
        pageStartIndex: 1,
        firstPageText: 'First',
        prePageText: 'Back',
        nextPageText: 'Next',
        lastPageText: 'Last',
        nextPageTitle: 'First page',
        prePageTitle: 'Pre page',
        firstPageTitle: 'Next page',
        lastPageTitle: 'Last page',
        showTotal: true,
        disablePageTitle: true,
        sizePerPageList: [{
          text: '5', value: 5
        },] 
      };
     const columns = [
        {
            dataField: 'id',
            text: 'Id'
          },{
        dataField: 'fname',
        text: 'Function Name'
      }, {
        dataField: 'description',
        text: 'Function Description'
      }, {
        dataField: 'version',
        text: 'Version'
      }];
      const contentTable = ({ paginationProps, paginationTableProps }) => (
        <div>
          <PaginationListStandalone  />
          <ToolkitProvider
  keyField="id"
  data={ Functions }
  columns={ columns }
  search
>
  {
    props => (
      <div>
        <SearchBar { ...props.searchProps } />
        <hr />
        <BootstrapTable 
        keyField='fname'
         expandRow={ expandRow }
          { ...props.baseProps }
          pagination={ paginationFactory(options) }
        />
      </div>
    )
  }
</ToolkitProvider>
        </div>
      );
  
      return (
        <div>
          <PaginationProvider
            pagination={
              paginationFactory(options)
            }
          >
            { contentTable }
          </PaginationProvider>
        </div >
      );
    }
  }
  export default T4;