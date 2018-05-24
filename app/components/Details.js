import React, { Component } from 'react';
import RaisedButton from 'material-ui/RaisedButton';
import Table from './Table';

export default class Details extends Component {
  componentDidMount() {
    const { page } = this.props;
    this.props.setDataLimit(page, 10);
  }

  refresh = () => {
    const { page } = this.props;
    this.props.fetchData(page);
  }

  addField = () => {
    const { page } = this.props;
    this.props.addField(page, 'State');
  }

  removeField = () => {
    const { page } = this.props;
    this.props.removeField(page, 4);
  }

  addFilter = () => {
    const { page } = this.props;
    this.props.addFilter(page, {
      name: 'Owner',
      operator: 'contains',
      value: 'y2185923',
    });
  }

  addProject = () => {
    const { page } = this.props;
    this.props.addField(page, 'Project');
  };

  addFilter2 = () => {
    const { page } = this.props;
    this.props.addFilter(page, {
      name: 'Name',
      operator: 'contains',
      value: '1',
    });
  }

  removeFilter = () => {
    const { page } = this.props;
    this.props.removeFilter(page, 1);
  }

  removeFilter2 = () => {
    const { page } = this.props;
    this.props.removeFilter(page, 2);
  }

  addSort = () => {
    const { page } = this.props;
    this.props.applySorting(page, 'FormattedID DESC');
  }

  removeSort = () => {
    const { page } = this.props;
    this.props.resetSorting(page);
  }

  next = () => {
    const { page } = this.props;
    const { currentPage } = this.props.dataByArtifact[page];
    this.props.switchPage(page, currentPage + 1);
  }

  prev = () => {
    const { page } = this.props;
    const { currentPage } = this.props.dataByArtifact[page];
    this.props.switchPage(page, currentPage - 1);
  }

  render() {
    const { page, dataByArtifact } = this.props;
    // this.props.dataByArtifact[this.props.page].data
    const { currentPage, pages, isFetching } = this.props.dataByArtifact[page];

    console.log(this.props);
    return (
      <div>
        <RaisedButton label="Refresh" primary onClick={this.refresh} />
        <RaisedButton label="Add State" primary onClick={this.addField} />
        <RaisedButton label="Add Project" primary onClick={this.addProject} />
        <RaisedButton label="Remove Field" primary onClick={this.removeField} />
        <RaisedButton label="Add Filter" primary onClick={this.addFilter} />
        <RaisedButton label="Remove Filter" primary onClick={this.removeFilter} />
        <RaisedButton label="Add Filter2" primary onClick={this.addFilter2} />
        <RaisedButton label="Remove Filter2" primary onClick={this.removeFilter2} />
        <RaisedButton label="Add Sort" primary onClick={this.addSort} />
        <RaisedButton label="Remove Sort" primary onClick={this.removeSort} />
        <RaisedButton label="Next ->" primary onClick={this.next} />
        {currentPage}/{pages}
        <RaisedButton label="<- Prev" primary onClick={this.prev} />
        {isFetching && <div>fetching...</div>}

        {dataByArtifact[page] &&
          <Table
            fields={dataByArtifact[page].fields}
            data={dataByArtifact[page].data}
          />
        }
      </div>
    );
  }
}
