import React from 'react';
import { Link } from 'react-router-dom';

class Page extends React.Component<{}, {}> {
  public render() {
    return (
      <div className="Grid">
        <nav>
          <ol>
            <li><Link to="/browse/dishwasher/20">View Dishwashers</Link></li>
            <li> <Link to="/browse/hob/20">View Hobs</Link></li>
            <li><Link to="/browse/bed/20">View Beds</Link></li>
          </ol>
        </nav>
      </div>
    );
  }
}

export default Page;