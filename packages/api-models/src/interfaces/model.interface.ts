export interface IModel {
    create(data: any);
    find();
    findById(id: any | string | number);
    findByIdAndUpdate(id: any | string | number, update: any);
    findByIdAndRemove(id: any | string | number);
    deleteOne(query: any);
    delete(query: any);
}
