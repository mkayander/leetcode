type Item<T> = T extends string ? T : null;
type ConvertMap<T extends Array<string>> = {
    [K in keyof T]: T[K] extends string ? unknown : null;
};

type Result = ConvertMap<["PointA", "PointB", "coins"]>;
