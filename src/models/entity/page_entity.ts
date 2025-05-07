/**
 * 分页实体
 * @param T 泛型
 */
export type PageEntity<T> = {
    current?: number;
    records?: T[];
    size?: number;
    total?: number;
}
