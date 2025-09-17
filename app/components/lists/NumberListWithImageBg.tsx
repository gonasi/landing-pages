type Content = {
  number: React.ReactNode;
  body: string;
  image: string;
};

interface NumberListWithImageBgProps {
  content: Content[];
}

export function NumberListWithImageBg({ content }: NumberListWithImageBgProps) {
  return (
    <div>
      {content.map((data, index) => {
        return (
          <div key={index} className="relative border h-18">
            <div className="absolute -top-4 left-4 h-20 w-20 rounded-full border">
              <h2>no mb</h2>
            </div>
            <div className="pl-26 h-full w-full bg-blue-200">content</div>
          </div>
        );
      })}
    </div>
  );
}
