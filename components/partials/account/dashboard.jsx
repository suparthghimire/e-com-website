import ALink from '~/components/features/custom-link'

export default function Dashboard(props) {
  return (
    <>
      <h3>Dashboard</h3>
      <hr />
      <p className="mb-0">
        Hello <span>{props.user.full_name}</span>
      </p>
      <p className="mb-8">
        From your account dashboard you can view your recent orders, manage and edit your password
        and account details.
      </p>
      <ALink href="/shop" className="btn btn-dark btn-rounded">
        Go To Shop<i className="d-icon-arrow-right"></i>
      </ALink>
    </>
  )
}
