import ALink from "~/components/features/custom-link";
import { useRouter } from "next/router";

export default function SubCategoryMobile(props) {
  const pathname = useRouter().pathname;

  return (
    <li className={`submenu  ${pathname.includes("/shop") ? "active" : ""}`}>
      <div
        className="megamenu width-sm bg-dark w-100"
        style={{ left: props.level == 1 ? "7px" : "0" }}
      >
        <div className="row" style={{ minWidth: "210px" }}>
          <ul
            className="bg-dark mobile-menu menu flex-column"
            style={{ overflow: "visible" }}
          >
            {props.category.map((sub_cat, index) => {
              return (
                <li
                  className={
                    sub_cat.sub_category && sub_cat.sub_category.length > 0
                      ? "submenu"
                      : ""
                  }
                  key={index}
                >
                  <ALink
                    href={
                      props.level == 1 ? "/pages/category/" + sub_cat.slug : "#"
                    }
                    className="submenu text-white"
                  >
                    {sub_cat.title}
                  </ALink>
                  {sub_cat.sub_category && sub_cat.sub_category.length > 0 ? (
                    <ul className="mobile-menu menu flex-column mb-0 m-0">
                      <SubCategoryMobile
                        category={sub_cat.sub_category}
                        title={sub_cat.title}
                        level={parseInt(props.level) + 1}
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
