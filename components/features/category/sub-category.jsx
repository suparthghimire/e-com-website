import ALink from "~/components/features/custom-link";
import { useRouter } from "next/router";

export default function SubCategory(props) {
  const pathname = useRouter().pathname;

  return (
    <li className={`submenu  ${pathname.includes("/shop") ? "active" : ""}`}>
      <div className="megamenu width-sm">
        <div className="row">
          {/* <div className="col-3 col-sm-4 col-md-3 col-lg-4"> */}
          {/* <h4 className="menu-title">{props.title}</h4> */}
          <ul>
            {props.category.map((sub_cat, index) => {
              return (
                <li>
                  <ALink href={"/" + sub_cat.url}>
                    <div
                      className="d-flex align-items-center"
                      style={{ gap: "5px" }}
                    >
                      <p style={{ fontSize: "1.5rem" }}>{sub_cat.title}</p>

                      {sub_cat.sub_category && sub_cat.sub_category.length > 0 && (
                        <p>
                          <i className="fas fa-angle-right"></i>
                        </p>
                      )}
                    </div>
                  </ALink>
                  {/* <p>Sub Category</p> */}
                  {sub_cat.sub_category && sub_cat.sub_category.length > 0 ? (
                    <ul className="menu horizontal-menu">
                      <SubCategory
                        category={sub_cat.sub_category}
                        title={sub_cat.title}
                      />
                    </ul>
                  ) : (
                    ""
                  )}
                </li>
              );
            })}
          </ul>
          {/* </div> */}
        </div>
      </div>
    </li>
  );
}
