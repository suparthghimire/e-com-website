import ALink from "~/components/features/custom-link";
import { useRouter } from "next/router";

export default function BrandHome(props) {
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
            {props.brand.map((brand, index) => {
              return (
                <li key={index}>
                  <ALink
                    style={{ fontSize: "1.5rem" }}
                    href={"/pages/brand/" + brand.slug}
                  >
                    {brand.title}
                  </ALink>
                </li>
              );
            })}
          </ul>
        </div>
      </div>
    </li>
  );
}
