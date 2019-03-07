/* Machine learning module so new castles (under n points, such as 180) learns from
 * old (upper) one.
 * Save a dataResource.json where we save path, points and time to reach there.
 *
 * Example :
 * {'points': 117, 'path': [[1, 1, ..., 7, 2], [1, 1, ..., 8, 2]], 'time': 130103010 (timestamp)}
 *
 * The actual model being based on chance to update x or y building, the automatic machine learning
 * will work as such : path to reach a cap may have higher chance for one, and lower for other buildings
 * so it will create a splitted cap or alternative cap model.
 *
 *
 */