import React, { Component, useEffect, useState } from "react";
import axios from "axios";
import BootstrapTable from 'react-bootstrap-table-next';
import paginationFactory, { PaginationProvider, PaginationListStandalone } from 'react-bootstrap-table2-paginator';
import filterFactory, { selectFilter } from 'react-bootstrap-table2-filter';
import ToolkitProvider, {Search} from 'react-bootstrap-table2-toolkit/dist/react-bootstrap-table2-toolkit';
import { Button } from "react-bootstrap";
const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};

class T4 extends Component {
  constructor() {
    super();
    this.state = {
      // For displaying data
      columns: [
        {
          dataField: 'FunctionName',
          text: 'Function Name',
          sort: true
        },
        {
          dataField: 'Description',
          text: 'Function Description',
        },
        {
          dataField: 'Version',
          text: 'Version',
          // formatter: this.linkFollow,
          sort: true
        },
      ],
      isFollow: true,
      isOpen: false,
      personName:[],
      CountryData:[],
      DomainNamess:''
    };
    this.onFollowChanged.bind(this);
    this.openModal.bind(this);
  }
  async componentDidMount() {
    // await axios.get('http://10.244.3.187:4300/api/v1/domain/' + DomainIds[i]).then((res)=>console.log("Stakeholders::",(res.data),DomainNamess=res.data));
        // console.log("DomainNamess:::",DomainNamess)
    const { data } = await axios.get('http://10.244.3.187:4300/api/v1/nodefunction')
    this.setState({ data });
  // await axios.get('http://10.244.3.187:4300/api/v1/stakeholder').then((res)=>console.log("CountryData::",(res.data),this.setState({CountryData:res.data})));
    // console.log("CountryDta:::",this.state.CountryData.data);
    // this.setState({CountryData:data});
  }
  onFollowChanged = (event) => {
    console.log("Event::", event._id)
    alert("Hello");
  }
  openModal = () => this.setState({ isOpen: true });
  closeModal = () => this.setState({ isOpen: false });

  handleChange1 = async (event) => {
    const DomainIds = event.target.value
    console.log("DomainIds::", DomainIds)
        await axios.get('http://10.244.3.187:4300/api/v1/stakeholder/' + DomainIds).then((res)=>console.log("Stakeholders::",(res.data),this.setState({CountryData:res.data})));
        console.log("DomainNamess:::",this.state.DomainNamess)
  
};



  linkFollow = (cell, row, rowIndex, formatExtraData) => {
    return (
      <>
        <form onSubmit={(e) => this.state.onFollowChanged(e)} >
          <Button
            onClick={() => {
              this.onFollowChanged(row);
            }}
          >
            Edit
          </Button>
        </form>
      </>
    );
  };
  handleClose = () => this.setState({ isOpen: false });
  handleShow = () => this.setState({ isOpen: true });
  render() {
    if (!this.state.data) return null;
    console.log(this.state.data);
    const expandRow = {
      onlyOneExpanding: true,
      renderer: row => (
        <div>
          <h5><b>{`Full Description of ${row.FunctionName}`}</b></h5>
          <p style={{ textAlign: "justify", textJustify: "inter-word" }}><b>{`${row.Description}`}</b></p>
        </div>
      )
    };
    const { SearchBar } = Search;
    const selectOptions = {
      1: 'Supplychain',
      2: 'DrugTracing'
    };
    const rowEvents = {
      onClick: (e, row, rowIndex) => {
        console.log(`Hello King Satish HCD`);
        console.log(`clicked on row with index: ${rowIndex}`);
      },
    };
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
      },] // A numeric array is also available. the purpose of above example is custom the text
    };
    const contentTable = ({ paginationProps, paginationTableProps }) => (
      <div>
        {/* <button className="btn btn-default" onClick={ this.loadData }>Load Another Data</button> */}
        <PaginationListStandalone />
        <ToolkitProvider
          keyField="_id"
          data={this.state.data}
          columns={this.state.columns}
          search
        >
          {
            props => (
              <div>
                {/* <h3>Input something at below input field:</h3> */}
                <SearchBar {...props.searchProps} />
                {/* <div class="col-sm" style={{marginTop:"0.4%",marginLeft:"3%"}}>
                        <Select
                                selected
          labelId="demo-multiple-name-label"
          id="demo-multiple-name"
          multiple
          fullWidth
          value={this.state.personName}
          onChange={this.state.handleChange1}
          input={<OutlinedInput label="Name" />}
          MenuProps={MenuProps}
        >
          {this.state.CountryData.map((name) => (
            <MenuItem
              key={name}
              value={name._id}
            >
              {name.StakeholderName}
            </MenuItem>
          ))}
        </Select>
                        </div> */}
                <hr />
                {/* <BootstrapTable keyField='id' data={ this.state.data } columns={ this.state.columns } rowEvents={ rowEvents } /> */}
                <BootstrapTable className="table table-bordered table-striped table-responsive"
                  keyField='_id'
                  data={this.state.data}
                  columns={this.state.columns}
                  filter={filterFactory()}
                  expandRow={expandRow}
                  {...props.baseProps}
                  pagination={paginationFactory(options)}
                />
              </div>
            )
          }
        </ToolkitProvider>
        {/* <PaginationListStandalone { ...paginationProps } /> */}
      </div>
    );
    return (
      <>
        <div>
          {/* <h2>PaginationProvider will care the data size change. You dont do anything</h2> */}
          <PaginationProvider
            pagination={
              paginationFactory(options)
            }
          >
            {contentTable}
          </PaginationProvider>
        </div >
        <div
          className="d-flex align-items-center justify-content-center"
          style={{ height: "" }}
        >
        </div>
        <div
          className="d-flex align-items-center justify-content-center"
          style={{ height: "" }}
        >
        </div>
      </>
    );
  }
}
export default T4;