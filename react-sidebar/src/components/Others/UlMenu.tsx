export type TUlMenu = {
  icon: string;
  title: string;
  id: string;
  li?: TUlMenu[];
};

export default function UlMenu({ data }: { data: TUlMenu[] }) {
  return (
    <ul>
      {data.map((val, i) => (
        <li>
          <span dangerouslySetInnerHTML={{ __html: val.icon }}></span>
          <h3>{val.title}</h3>
          {val.li && val?.li.length > 0 && <UlMenu data={val.li} />}
        </li>
      ))}
    </ul>
  );
}
