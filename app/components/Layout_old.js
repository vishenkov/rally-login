import React, { Component } from 'react';
import CircularProgress from 'material-ui/CircularProgress';
import { Link } from 'react-router-dom';
import styles from './Layout.css';
import Table from './Table';
import Bar from './Bar';
import SideMenu from './SideMenu';
import DetailsContainer from '../containers/DetailsContainer';
import pages from '../utils/static/menu';


export default class Layout extends Component {
  state = {
    isMenuOpened: false,
    // page: this.props.match.params.page,
  };

  componentDidMount() {
    // const { page } = this.props.dashboard;
    // this.props.fetchData(page.identity);
    console.log('LAYOUT MOUNTED');
    console.log(this.props);
  }

  componentWillReceiveProps(nextProps) {
    console.log('FUTURE', nextProps);
    // const { page } = this.props.match.params;
    // this.setState({ page });
  }

  // shouldComponentUpdate(nextProps, nextState) {
  //   console.log(nextProps, nextState);
  //   return true;
  // }

  onMenuClick = () => {
    console.log('click!');
    this.setState({ isMenuOpened: !this.state.isMenuOpened });
    // this.props.startDataFetching('defect');
  };

  render() {
    // const { workspase, defects } = this.state;
    // const { page } = this.props.dashboard;
    // const { data, fetching } = this.props.rally;
    // console.log('data', data);
    // console.log('page', page);
    // const headers = ['FormattedID', 'Name', 'Project', 'State'];
    // const tableData = data
    //   ? data.map(defect => [defect.FormattedID, defect.Name, defect.Project.Name, defect.State])
    //   : [];
    // const { page } = this.state;
    const { page } = this.props.match.params;

    return (
      <div>
        <Bar
          title={page}
          onMenuClick={this.onMenuClick}
        />
        <div>
          <SideMenu
            pages={pages}
            currentPage={page}
            open={this.state.isMenuOpened}
            onMenuClick={this.onMenuClick}
          />
        </div>
        <div style={{marginLeft: '50%'}}>{page}</div>
        {/* <Link to="/defects">Def</Link> */}
        <DetailsContainer page={page} />
      </div>);
    // return (
    //   <div>
    //     {fetching
    //     ? (
    //       <div className={styles.loading}>
    //         <CircularProgress size={80} thickness={5} />
    //       </div>)
    //     : (
    //       <div>
    //         <Bar
    //           title={page.name}
    //           onMenuClick={this.onMenuClick}
    //         />
    //         <div>
    //           <SideMenu
    //             open={this.state.menuOpened}
    //             onMenuClick={this.onMenuClick}
    //           />
    //         </div>
    //         <div className={styles.table}>
    //           <Table
    //             headers={headers}
    //             body={tableData}
    //           />
    //         </div>
    //       </div>
    //     )
    //     }
    //   </div>
    // );
  }
}
