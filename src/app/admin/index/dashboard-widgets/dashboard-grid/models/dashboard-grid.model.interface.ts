export interface IDashboardGridConfig {
    row: IDashboardRowConfig[];
}
export interface IDashboardRowConfig{
    tiles: IDashboardTileConfig[];
}
export interface IDashboardTileConfig{
    config: any;
}