# Curva-turn

## Bugs and features

* (FIXED) Not updating neighbourhoods of old nodes (or at least not plotting them)
    * Plotting is fine (or - does not even need to know all)
    * I seem to add neighbours when flourishing (oh, but I see - not always[2]).
* (FIXED) Problem with concave parts, oversaturating and updating when k == k0.
* (FIXED) Problem with visualizing new edges from non-new nodes.
* Better seed to have always a planar graphs
* Add slider to choose no of neighbours
* Add automated addition (growth)
* Add exploration mode
* Put it Twitter's Bootstrap
* Do some tests before it hurts

### Other ideas

* Some strange topologies
    * Torus, Klein's bottle 
    * http://math.ucr.edu/home/baez/klein.html#symmetrical
    * Trees, molecules, fractals, ...
    * One-way edges
* Things you don't see do not exist (a'al Closure)
* Bees on honeycomb :)

### Misc

* "neighbours" -> "adj" ?

## References

* [Regge calculus](http://en.wikipedia.org/wiki/Regge_calculus)
* HyperRogue
* http://www.redblobgames.com/grids/hexagons/ and in general http://www.redblobgames.com/

### Get further inspired by

* Two fractal games

## Send to

* Hyperrogue's author
* John Baez
* Manish Goregaokar

## Architecture

* Graph import
* Graph export
* Graph join


* Ego-vis
* 