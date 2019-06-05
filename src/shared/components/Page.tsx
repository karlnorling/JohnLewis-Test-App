import React from 'react';
import { Link } from 'react-router-dom';

class Page extends React.Component<{}, {}> {
  public render() {
    return (
      <div className="Grid">
        <nav>
          <ol>
            <li><Link to="/dishwasher/20">View Dishwashers</Link></li>
            <li> <Link to="/hob/20">View Hobs</Link></li>
            <li><Link to="/bed/20">View Beds</Link></li>
          </ol>
        </nav>
      </div>
    );
  }
}

export default Page;