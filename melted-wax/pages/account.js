import AccountHeader from '../components/Account/AccountHeader';
import AccountOrders from '../components/Account/AccountOrders';
import AccountPermissions from '../components/Account/AccountPermissions';
import ChangePassword from '../components/Account/ChangePassword'
import { parseCookies } from 'nookies';
import axios from 'axios';
import baseUrl from '../utils/baseUrl';
import globalStyles from '../static/styles/global.module.scss';
import styles from '../static/styles/account.module.scss';

function Account({ user, orders }) {

  return (
    <div className={globalStyles.pageContainer}>
      <div className={globalStyles.darkContainer}>
        <div className={globalStyles.contentContainer + " " + styles.accountContainer + " container"}>
          <AccountHeader {...user} />
          <AccountOrders orders={orders} />
          {user.role === 'root' &&  <AccountPermissions />}
          <ChangePassword {...user} />
        </div>
      </div>
    </div>
  )
}

// Account.getInitialProps = async ctx => {
export async function getServerSideProps(ctx) {
  const { token } = parseCookies(ctx)
  if(!token){
    return { props: { orders: [] }}
  }
  const payload = { headers: { Authorization: token }}
  const url = `${baseUrl}/api/orders`
  const response = await axios.get(url, payload)
  return response.data
}

export default Account;
