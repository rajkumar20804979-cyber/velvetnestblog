import Link from "next/link"

export function AffiliateDisclosure() {
  return (
    <div className="mb-14">
      <p
        className="
          text-[1rem]
          leading-[2]
          italic
          text-[#5d5148]
          md:text-[1.05rem]
          md:leading-[2]
        "
      >
        Some of the links in this post are affiliate links, including from
        Amazon and other trusted partners. If you click on the link and
        purchase the item, I may receive a small commission at no extra cost
        to you. You can learn more{" "}
        <Link
          href="/affiliate-disclosure"
          className="
            font-medium
            text-[#9d7b5f]
            underline
            underline-offset-[5px]
            transition
            hover:opacity-70
          "
        >
          here
        </Link>
        .
      </p>
    </div>
  )
}
