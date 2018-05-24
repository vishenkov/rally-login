import React, { Component } from 'react';
import Layout from './Layout';
import ArtifactTable from './ArtifactTable';
import getFieldTypes from '../utils/fieldTypes';
import Alert from './Alert';

export default class ArtifactLayout extends Component {
  componentDidMount() {
    const { artifact } = this.props;
    if (!this.props.dataByArtifact[artifact].data.length) {
      this.props.fetchData(artifact);
    }
  }

  handleRefresh = e => {
    e.preventDefault();
    const { artifact } = this.props;
    this.props.fetchData(artifact);
  }

  handleRequestSort = (event, index, direction) => {
    const { artifact } = this.props;
    this.props.makeSort(artifact, index, direction !== 'desc' ? 'desc' : 'asc');
  };

  handleRequestFilter = (event, field, operator, value) => {
    const { artifact } = this.props;
    this.props.addFilter(artifact, {
      field,
      operator,
      value,
    });
  };

  handleUpdateFilter = (event, index, fieldType, value) => {
    const { artifact } = this.props;
    this.props.updateFilter(artifact, index, fieldType, value);
  };

  handleDeleteFilter = (event, index) => {
    const { artifact } = this.props;
    this.props.removeFilter(artifact, index);
  };

  handleChangePage = (event, page) => {
    const { artifact } = this.props;
    this.props.switchPage(artifact, page);
  };

  handleChangeRowsPerPage = (event, count) => {
    const { artifact } = this.props;
    this.props.setRowsPerPage(artifact, count);
  };

  handleAddField = (event, field) => {
    const { artifact } = this.props;
    this.props.addField(artifact, field);
  };

  handleRemoveField = (event, index) => {
    const { artifact } = this.props;
    this.props.removeField(artifact, index);
  };

  render() {
    // console.log(this.props);
    // const { artifact } = this.props.dataByArtifact;
    const { artifact } = this.props;
    const {
      data, fields, pages, limit, currentPage, filters, isFetching, sort, status, error
    } = this.props.dataByArtifact[artifact];
    console.log(status, error);
    // this.props.fetchData('artifact');
    const artifactTypes = getFieldTypes(artifact);

    return (
      <Layout title={this.props.title}>
        <ArtifactTable
          title={this.props.title}
          artifactTypes={artifactTypes}
          data={data}
          fields={fields}
          pages={pages}
          limit={limit}
          sort={sort}
          isFetching={isFetching}
          filters={filters}
          currentPage={currentPage}
          onRequestSort={this.handleRequestSort}
          onRequestFilter={this.handleRequestFilter}
          onUpdateFilter={this.handleUpdateFilter}
          onDeleteFilter={this.handleDeleteFilter}
          onChangePage={this.handleChangePage}
          onChangeRowsPerPage={this.handleChangeRowsPerPage}
          onAddField={this.handleAddField}
          onRemoveField={this.handleRemoveField}
          onRefresh={this.handleRefresh}
        />
        {status === 'error' && <Alert message={error || 'API Error!'} />}
      </Layout>
    );
  }
}
