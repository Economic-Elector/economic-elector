import React, {Component} from 'react';

import {connect} from 'react-redux';


class BudgetItem extends Component {


    render() {
        console.log('item', this.props.item)
      return (
          <div>
            {this.props.item.name}{this.props.item.past_allocation}
          </div>
    )}
  }
  
  const mapStateToProps = (reduxState) => ({
    reduxState
  });
  
  export default connect(mapStateToProps)(BudgetItem);