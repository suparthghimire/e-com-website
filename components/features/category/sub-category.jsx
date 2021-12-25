import ALink from "~/components/features/custom-link";
import { useRouter } from "next/router";

export default function SubCategory(props) {
  const pathname = useRouter().pathname;

  return (
    <li className={`submenu  ${pathname.includes("/shop") ? "active" : ""}`}>
      <div className="megamenu width-sm">
        <div className="row" style={{ minWidth: "210px" }}>
          <ul>
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
                    href={"/pages/category/" + sub_cat.slug}
                    className="submenu"
                  >
                    {sub_cat.title}
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
