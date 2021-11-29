import ALink from "~/components/features/custom-link";
import { useRouter } from "next/router";

export default function SubCategoryHome(props) {
  const pathname = useRouter().pathname;

  return (
    <li className={`submenu  ${pathname.includes("/shop") ? "active" : ""}`}>
      <div
        className={
          "megamenu home-megamenu" +
          (props.level === 1 ? " inner-mega-menu" : "")
        }
      >
        <div className="row">
          <ul>
            {props.category.map((sub_cat, index) => {
              return (
                <li
                  key={index}
                  className={
                    sub_cat.sub_category &&
                    sub_cat.sub_category.length > 0 &&
                    "submenu "
                  }
                >
                  <ALink
                    style={{ fontSize: "1.5rem" }}
                    href={"/pages/category/" + sub_cat.slug}
                  >
                    {sub_cat.title}
                  </ALink>
                  {sub_cat.sub_category && sub_cat.sub_category.length > 0 ? (
                    <ul className="menu horizontal-menu">
                      <SubCategoryHome
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
