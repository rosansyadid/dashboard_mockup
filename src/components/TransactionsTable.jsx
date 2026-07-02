import { transactionsData } from '../data';

export default function TransactionsTable() {
  return (
    <div className="data-card animate-in animate-delay-5" id="transactions-card">
      <div className="data-card-header">
        <h2 className="data-card-title">Recent Transactions</h2>
        <button className="view-all-btn" id="view-all-transactions-btn">
          View All →
        </button>
      </div>
      <table className="data-table">
        <thead>
          <tr>
            <th>Customer</th>
            <th>Amount</th>
            <th>Status</th>
            <th>Date</th>
          </tr>
        </thead>
        <tbody>
          {transactionsData.map((tx) => (
            <tr key={tx.id}>
              <td>
                <div className="table-user">
                  <div
                    className="table-user-avatar"
                    style={{ background: tx.user.color }}
                  >
                    {tx.user.initials}
                  </div>
                  <div>
                    <div className="table-user-name">{tx.user.name}</div>
                    <div className="table-user-email">{tx.user.email}</div>
                  </div>
                </div>
              </td>
              <td style={{ fontWeight: 600, color: '#f0f2f8' }}>{tx.amount}</td>
              <td>
                <span className={`status-badge ${tx.status}`}>
                  <span className="status-dot" />
                  {tx.status.charAt(0).toUpperCase() + tx.status.slice(1).replace('-', ' ')}
                </span>
              </td>
              <td>{tx.date}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
