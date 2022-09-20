import React, { Component } from 'react';
import Statistics from './components/Statistics';
import Options from './components/Options';
import Feedback from './components/Feedback';
import Notification from './components/Notification';

export default class App extends Component {
  state = {
    good: 0,
    neutral: 0,
    bad: 0,
  };

  countTotalFeedback = () => {
    const { good, neutral, bad } = this.state;
    const result = good + neutral + bad;
    return result;
  };

  countPositiveFeedbackPercentage = () => {
    const result = this.countTotalFeedback();
    const { good } = this.state;
    const percentage = (good * 100) / result;
    return Math.round(percentage);
  };

  onLeaveFeedback = e => {
    const name = e.target.name;
    this.setState(prevState => ({
      [name]: prevState[name] + 1,
    }));
  };
  render() {
    const { good, neutral, bad } = this.state;
    const total = this.countTotalFeedback();
    const positivePercentage = this.countPositiveFeedbackPercentage();

    const objKey = Object.keys(this.state);
    return (
      <section>
        <Feedback title="Please leave feedback">
          <Options options={objKey} onLeaveFeedback={this.onLeaveFeedback} />
        </Feedback>

        {total === 0 ? (
          <Feedback title="Statistics">
            <Notification message="No feedback given" />
          </Feedback>
        ) : (
          <Feedback title="Statistics">
            <Statistics
              good={good}
              neutral={neutral}
              bad={bad}
              total={total}
              positivePercentage={positivePercentage}
            />
          </Feedback>
        )}
      </section>
    );
  }
}
