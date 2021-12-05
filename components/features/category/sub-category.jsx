import ALink from "~/components/features/custom-link";
import { useRouter } from "next/router";

export default function SubCategory(props) {
  const pathname = useRouter().pathname;

  return (
    <li className={`submenu  ${pathname.includes("/shop") ? "active" : ""}`}>
      <div className="megamenu width-sm">
        <div className="row">
          <ul>
            {props.category.map((sub_cat, index) => {
              return (
                <li key={index}>
                  <ALink href={"/pages/category/" + sub_cat.slug}>
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
                  {sub_cat.sub_category && sub_cat.sub_category.length > 0 ? (
                    <ul>
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
        </div>
      </div>
    </li>
  );
}
