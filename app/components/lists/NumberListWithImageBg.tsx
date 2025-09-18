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
    <div className="flex flex-col space-y-10">
      {content.map((data, index) => {
        return (
          <div key={index} className="relative h-20">
            {/* Circle with number */}
            <div className="absolute -top-4 left-4 h-20 w-20 rounded-full border bg-gray-50 border-t-2 border-t-yellow-700 flex items-center justify-center z-10">
              {data.number}
            </div>

            {/* Background card */}
            <div
              className="pl-26 h-full w-full relative flex flex-col items-center justify-center rounded-lg shadow-md bg-cover bg-center"
              style={{ backgroundImage: `url(${data.image})` }}
            >
              <div className="absolute inset-0 bg-gray-800/60 rounded-lg"></div>

              {/* Stack number above body */}
              <div className="relative flex flex-col gap-2 w-full">
                <p className="text-gray-50 font-bold p-2 text-left">
                  {data.body}
                </p>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
