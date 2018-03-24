import * as React from 'react';

import './AppFooter.scss';

export default class AppFooter extends React.Component {

    $footer = null;

    grabFooter = elem => {
        this.$footer = elem;
        if (elem) {
            this.forceUpdate();
        }
    }

    get footerHeight() {
        return this.$footer ? this.$footer.getBoundingClientRect().height : 0;
    }

    render() {
        return (
            <div
                className="AppFooter"
                style={{
                    height: this.footerHeight
                }}
            >
                <div
                    ref={this.grabFooter}
                    className="AppFooter--content"
                >
                    <button type="button">Cancel</button>
                    <button type="button">OK</button>
                </div>
            </div>
        );
    }
}
