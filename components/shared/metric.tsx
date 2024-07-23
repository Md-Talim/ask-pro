import clsx from "clsx";
import Image from "next/image";
import Link from "next/link";

interface Props {
  iconUrl: string;
  alt: string;
  value: string | number;
  title: string;
  href?: string;
  textStyles?: string;
  isAuthor?: boolean;
}

const Metric = ({
  title,
  value,
  alt,
  iconUrl,
  href,
  textStyles,
  isAuthor,
}: Props) => {
  const mainContent = (
    <>
      <Image
        src={iconUrl}
        height={16}
        width={16}
        alt={alt}
        className="rounded-full object-contain"
      />

      <p className={clsx(textStyles, "flex items-center gap-1")}>
        <span>{value}</span>{" "}
        <span
          className={clsx(
            "small-regular line-clamp-1",
            isAuthor && "max-sm:hidden",
          )}
        >
          {title}
        </span>
      </p>
    </>
  );

  if (href) {
    return (
      <Link href={href} className="flex-center gap-1">
        {mainContent}
      </Link>
    );
  }

  return <div className="flex-center flex-wrap gap-1">{mainContent}</div>;
};

export default Metric;
