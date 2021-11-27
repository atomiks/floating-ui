export const Chrome = ({children, dark, center, scrollable}) => {
  const scrollableRef = useRef();

  useLayoutEffect(() => {
    if (scrollable) {
      scrollableRef.current.scrollTop = 350;
    }
  }, [scrollable]);

  return (
    <div className="relative bg-gray-50 rounded-lg overflow-hidden h-64 text-gray-900">
      <div className="absolute w-full flex gap-2 bg-gray-100 p-4 z-10 top-0">
        <div
          className="rounded-full w-4 h-4"
          style={{background: '#ec695e'}}
        />
        <div
          className="rounded-full w-4 h-4"
          style={{background: '#f4bf4f'}}
        />
        <div
          className="rounded-full w-4 h-4"
          style={{background: '#61c653'}}
        />
      </div>
      <div
        ref={scrollableRef}
        className={cn(
          'overflow-hidden relative p-2 h-full mt-12',
          {
            'grid items-center': center,
            'overflow-scroll': scrollable,
          }
        )}
      >
        {children}
      </div>
    </div>
  );
};
