const React = require('react');
const { TabNavBar, UnsafeComponent } = require('hadron-react-components');

/**
 * Represents the instance view.
 */
class InstanceComponent extends React.Component {

  static displayName = 'InstanceComponent';

  /**
   * Instantiate the instance component.
   *
   * @param {Object} props - The properties.
   */
  constructor(props) {
    super(props);
    this.state = { activeTab: 0 };
    this.setupTabs();
  }

  /**
   * Handle the tab click.
   *
   * @param {Number} idx - The index of the clicked tab.
   */
  onTabClicked(idx) {
    if (this.state.activeTab === idx) {
      return;
    }
    this.setState({ activeTab: idx });
  }

  /**
   * Setup the instance level tabs.
   */
  setupTabs() {
    const roles = global.hadronApp.appRegistry.getRole('Instance.Tab');

    const tabs = roles.map((role) => role.name);
    const views = roles.map((role, i) => {
      return (
        <UnsafeComponent component={role.component} key={i} />
      );
    });

    this.tabs = tabs;
    this.views = views;
  }

  /**
   * Render the instance component.
   *
   * @returns {React.Component} The rendered component.
   */
  render() {
    return (
      <div className="rtss">
        <TabNavBar
          theme="light"
          tabs={this.tabs}
          views={this.views}
          activeTabIndex={this.state.activeTab}
          onTabClicked={this.onTabClicked.bind(this)}
          className="rt-nav"
          mountAllViews={false}
        />
      </div>
    );
  }
}

module.exports = InstanceComponent;
